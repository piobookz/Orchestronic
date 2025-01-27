import axios from "axios";
import { NextResponse } from "next/server";
import { URLSearchParams } from "url";

export async function POST(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const params = new URLSearchParams(url.search);
  const dagId = params.get("dagId");
  const projectId = params.get("projectId");

  console.log("Triggering DAG:", dagId, "for Project:", projectId);

  try {
    const response = await axios.post(
      `http://localhost:8080/api/v1/dags/${dagId}/dagRuns`,
      {
        conf: { projectId }, // Pass projectId as part of DAG configuration
      },
      {
        auth: {
          username: process.env.AIRFLOW_USERNAME,
          password: process.env.AIRFLOW_PASSWORD,
        },
      }
    );

    return NextResponse.json({ success: true, data: response.data });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return NextResponse.json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
}
