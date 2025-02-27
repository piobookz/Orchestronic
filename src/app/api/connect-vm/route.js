// pages/api/connect-vm.js
import { DefaultAzureCredential } from "@azure/identity";
import { ComputeManagementClient } from "@azure/arm-compute";
import { ResourceManagementClient } from "@azure/arm-resources";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { resourceName, rgName, os } = req.body;

  try {
    // Authenticate using Azure credentials (server-side)
    const credential = new DefaultAzureCredential({
      clientId: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      tenantId: process.env.AZURE_TENANT_ID,
    });

    // Initialize the ResourceManagementClient to check resource group
    const resourceClient = new ResourceManagementClient(
      credential,
      process.env.AZURE_SUBSCRIPTION_ID
    );

    // Check if resource group exists
    try {
      await resourceClient.resourceGroups.get(rgName);
    } catch (error) {
      if (error.statusCode === 404) {
        return res.status(404).json({ 
          message: `Resource group '${rgName}' not found in Azure`,
          resourceGroupExists: false
        });
      }
      throw error; // Re-throw if it's another type of error
    }

    // Initialize the ComputeManagementClient
    const computeClient = new ComputeManagementClient(
      credential, 
      process.env.AZURE_SUBSCRIPTION_ID
    );

    // Check if VM exists
    try {
      const vm = await computeClient.virtualMachines.get(rgName, resourceName);
      
      // Get VM's public IP address (this part would need implementation)
      const publicIPAddress = await getVMPublicIP(vm, networkClient, rgName);

      return res.status(200).json({
        success: true,
        resourceGroupExists: true,
        vmExists: true,
        vmDetails: {
          name: vm.name,
          publicIP: publicIPAddress,
          os: os,
          status: vm.provisioningState
        }
      });
    } catch (error) {
      if (error.statusCode === 404) {
        return res.status(404).json({ 
          message: `VM '${resourceName}' not found in resource group '${rgName}'`,
          resourceGroupExists: true,
          vmExists: false
        });
      }
      throw error; // Re-throw if it's another type of error
    }
  } catch (error) {
    console.error("Error checking VM resources:", error);
    return res.status(500).json({ 
      message: "Failed to connect to VM", 
      error: error.message 
    });
  }
}