declare const axios: any;
interface Metrics {
    [key: string]: {
        totalTime: number;
        uniqueCode: string;
        status: number;
    };
}
interface Options {
    uniqueCode: string;
}
declare class ApiMetricsClass {
    static metrics: Metrics;
    static sendMetrics(metrics: Metrics): Promise<void>;
    static storeMetrics: (options: Options) => (req: any, res: any, next: any) => void;
}
