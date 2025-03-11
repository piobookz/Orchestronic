'use server'

import { MongoClient } from "mongodb";

// Azure and MongoDB configuration
const uri = process.env.MONGODB_URI;
const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
const tenantId = process.env.AZURE_TENANT_ID;
const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;

// Get an Azure access token
async function getAzureAccessToken() {
  const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/token`;
  
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    resource: 'https://management.azure.com/'
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body
  });

  if (!response.ok) throw new Error(`Failed to get Azure token: ${await response.text()}`);

  const data = await response.json();
  return data.access_token;
}

// Get VM's public IP from Azure
export async function getVMConnectionDetails(resourceName, rgName, os) {
  try {
    // Get resource credentials from MongoDB
    const resource = await getResourceDetails(resourceName, rgName);
    
    if (!resource) {
      return { success: false, message: `VM '${resourceName}' not found in database` };
    }
    
    // Get access token for Azure API
    const accessToken = await getAzureAccessToken();
    
    // Check if VM exists in Azure
    const vmResult = await getVmDetails(rgName, resourceName, accessToken);
    
    if (!vmResult.exists) {
      return { 
        success: false, 
        resourceGroupExists: true,
        vmExists: false,
        message: `VM '${resourceName}' not found in Azure` 
      };
    }
    
    // Get network interface and public IP
    const publicIP = await getPublicIP(vmResult.data, accessToken);
    
    if (!publicIP) {
      return {
        success: false,
        message: `VM '${resourceName}' does not have a public IP address yet`
      };
    }
    
    // Return success with connection details
    return {
      success: true,
      vmDetails: {
        name: resourceName,
        publicIP: publicIP,
        os: os,
        username: resource.username,
        status: vmResult.data.properties.provisioningState
      }
    };
  } catch (error) {
    console.error("Error getting VM connection details:", error);
    return { 
      success: false, 
      message: error.message || "Failed to connect to VM" 
    };
  }
}

// Helper functions
async function getResourceDetails(resourceName, rgName) {
  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    
    const database = client.db("test");
    const resources = database.collection("resources");
    
    // Extract project ID from rgName (format: rg-<projectId>)
    const projectId = rgName.replace('rg-', '');
    
    // Query resource by VM name and project ID
    return await resources.findOne({
      vmname: resourceName,
      projectid: projectId
    });
  } finally {
    if (client) await client.close();
  }
}

async function getVmDetails(resourceGroupName, vmName, accessToken) {
  const apiVersion = '2023-03-01';
  const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Compute/virtualMachines/${vmName}?api-version=${apiVersion}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 404) return { exists: false };
    throw new Error(`Azure API error: ${await response.text()}`);
  }

  return { exists: true, data: await response.json() };
}

async function getPublicIP(vmData, accessToken) {
  // Get network interfaces
  const networkInterfaces = vmData.properties.networkProfile.networkInterfaces;
  if (!networkInterfaces || networkInterfaces.length === 0) {
    return null;
  }
  
  // Get network interface details
  const nicUrl = `https://management.azure.com${networkInterfaces[0].id}?api-version=2023-05-01`;
  const nicResponse = await fetch(nicUrl, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  
  if (!nicResponse.ok) return null;
  
  const nic = await nicResponse.json();
  
  // Check for public IP
  if (!nic.properties.ipConfigurations || 
      !nic.properties.ipConfigurations[0].properties.publicIPAddress) {
    return null;
  }
  
  // Get public IP details
  const publicIpId = nic.properties.ipConfigurations[0].properties.publicIPAddress.id;
  const publicIpUrl = `https://management.azure.com${publicIpId}?api-version=2023-05-01`;
  
  const ipResponse = await fetch(publicIpUrl, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  
  if (!ipResponse.ok) return null;
  
  const ipData = await ipResponse.json();
  return ipData.properties.ipAddress;
}