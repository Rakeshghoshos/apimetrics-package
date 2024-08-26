var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import axios from '../node_modules/axios/index';
class ApiMetricsClass {
    static sendMetrics(metrics) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.post('https://apimetrics-backend.onrender.com/data', {
                    metrics: metrics,
                });
                console.log('Metrics sent successfully:', response.data);
            }
            catch (error) {
                console.error('Error sending metrics:', error.message);
            }
        });
    }
}
_a = ApiMetricsClass;
ApiMetricsClass.metrics = {}; // Define the static property with the correct type
ApiMetricsClass.storeMetrics = (options) => (req, res, next) => {
    const start = process.hrtime.bigint(); // High resolution time at start
    res.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
        const diff = process.hrtime.bigint() - start; // Time taken
        const responseTime = Number(diff) / 1000000; // Convert nanoseconds to milliseconds
        // Log the metrics
        const route = req.route ? req.route.path : req.path; // Get the route path
        const baseUrl = req.baseUrl;
        const key = baseUrl + "" + route;
        _a.metrics[key] = _a.metrics[key] || { totalTime: 0 };
        _a.metrics[key].totalTime = responseTime;
        _a.metrics[key].uniqueCode = options.uniqueCode;
        _a.metrics[key].status = res.statusCode;
        yield _a.sendMetrics(_a.metrics);
        _a.metrics = {};
    }));
    next();
};
export default ApiMetricsClass;
