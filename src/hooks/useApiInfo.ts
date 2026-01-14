import { useState, useEffect } from 'react';

interface ApiInfo {
  version: string | null;
  date: string | null;
}

export function useApiInfo() {
  const [apiInfo, setApiInfo] = useState<ApiInfo>({
    version: null,
    date: null
  });

  useEffect(() => {
    const fetchApiInfo = async () => {
      try {
        const response = await fetch('https://apibr.com/vagas/api/v2/issues?per_page=1');
        const version = response.headers.get('x-api-version');
        const date = response.headers.get('x-api-date');
        setApiInfo({ version, date });
      } catch (error) {
        console.error('Failed to fetch API info:', error);
      }
    };

    fetchApiInfo();
  }, []);

  return apiInfo;
}