interface EnvConfig {
    baseUrl: string;
    apiTimeout: number;
    environment: string;
}

const getEnvConfig = (): EnvConfig => {
    return {
        baseUrl: import.meta.env.VITE_BASE_URL || 'http://localhost:8080/',
        apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
        environment: import.meta.env.VITE_ENV || import.meta.env.MODE || 'development'
    };
};

export const envConfig = getEnvConfig();

// Helper function to validate environment setup
export const validateEnv = () => {
    if (!envConfig.baseUrl) {
        console.warn('VITE_BASE_URL not set, using default localhost');
    }
    console.log(`Environment: ${envConfig.environment}`);
    console.log(`Base URL: ${envConfig.baseUrl}`);
};
