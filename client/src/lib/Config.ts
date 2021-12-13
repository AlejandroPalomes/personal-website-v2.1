export const isProductionEnvironment = process.env.VUE_APP_ENV === 'production';
export const isLocalEnvironment = process.env.VUE_APP_ENV === 'development';

type Environment = 'development' | 'production';

const getAPIBaseURL = (): string => {
  if (process.env.VUE_APP_PUBLIC_API_URL) {
    return process.env.VUE_APP_PUBLIC_API_URL;
  }

  if (process.env.VUE_APP_ENV === 'production') {
    return 'https://www.alejandropalomes.com/api';
  }

  if (process.env.VUE_APP_ENV === 'development') {
    return 'http://localhost:8000/api';
  }

  return 'http://localhost:8000/api';
};

export const getEnvironment = (): Environment => {
  const env = process.env.VUE_APP_ENV || 'development';
  switch (env) {
    case 'development':
      return 'development';
    case 'production':
      return 'production';
    default:
      console.error('Unexpected VUE_APP_ENV', env);
      return 'development';
  }
};

export const Config = {
  API_URL: getAPIBaseURL()
};

