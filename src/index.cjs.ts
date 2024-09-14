const axios = require("axios");

interface Metrics {
  [key: string]: {
      totalTime: number;
      uniqueCode:string;
      status:number;
  };
  
}

interface Options{
  uniqueCode:string
}

class ApiMetricsClass {
  static metrics: Metrics = {}; // Define the static property with the correct type

  static async sendMetrics(metrics:Metrics) {
    try {
      const response = await axios.post('https://apimetrics-backend.vercel.app/data', {
        metrics:metrics,
      });

      console.log('Metrics sent successfully:', response.data);
    } catch (error:any) {
      console.error('Error sending metrics:', error.message);
    }
  }

  static storeMetrics = (options:Options)=>(req: any, res: any, next: any) => {
    const start = process.hrtime.bigint();  // High resolution time at start

    res.on('finish', async() => {
      const diff = process.hrtime.bigint() - start; // Time taken
      const responseTime = Number(diff) / 1000000; // Convert nanoseconds to milliseconds

      // Log the metrics
      const route = req.route ? req.route.path : req.path; // Get the route path
      const baseUrl = req.baseUrl;
      const key = baseUrl+""+route; 
      ApiMetricsClass.metrics[key] = ApiMetricsClass.metrics[key] || {  totalTime: 0 };
      ApiMetricsClass.metrics[key].totalTime = responseTime;
      ApiMetricsClass.metrics[key].uniqueCode = options.uniqueCode;
      ApiMetricsClass.metrics[key].status = res.statusCode;
      await ApiMetricsClass.sendMetrics(ApiMetricsClass.metrics);
      ApiMetricsClass.metrics = {};
    });

    next();
  }

}
module.exports = ApiMetricsClass
