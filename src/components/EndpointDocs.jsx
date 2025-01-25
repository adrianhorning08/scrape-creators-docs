import React from 'react';
import { useLocation } from 'react-router-dom';
import { apis } from '../constants/apis';
import EndpointHeader from './api/EndpointHeader';
import EndpointMethod from './api/EndpointMethod';
import ParameterSection from './api/ParameterSection';
import ResponseFields from './api/ResponseFields';
import CodeBlock from './CodeBlock';
import Introduction from './Introduction';
import { Helmet } from 'react-helmet-async';

export default function EndpointDocs() {
  const location = useLocation();
  const path = location.pathname;
  
  // Generate meta description based on endpoint data
  const getMetaDescription = (endpoint) => {
    if (!endpoint) return '';
    return `${endpoint.name} API endpoint documentation - ${endpoint.description}`;
  };

  // Show introduction for root path or /introduction
  if (path === '/' || path === '/introduction') {
    return <Introduction />;
  }

  // Find the API and endpoint that matches this exact path
  const api = apis.find(api => api.endpoints.some(e => e.path === path));
  const endpointData = api?.endpoints.find(e => e.path === path);
  
  if (!api || !endpointData) {
    return <div>Endpoint not found: {path}</div>;
  }

  return (
    <>
      <Helmet>
        <title>{`${endpointData.name} API Endpoint - Scrape Creators Documentation`}</title>
        <meta name="description" content={`${endpointData.description} - Complete API documentation with examples in multiple programming languages including JavaScript, Python, cURL, PHP, Go, and Java.`} />
        <meta name="keywords" content={`${endpointData.name}, API endpoint, Scrape Creators, ${endpointData.method}, API documentation, ${endpointData.path}`} />
        <link rel="canonical" href={`https://docs.scrapecreators.com${path}`} />
        <meta property="og:title" content={`${endpointData.name} API Endpoint - Scrape Creators Documentation`} />
        <meta property="og:description" content={`${endpointData.description} - Complete API documentation with examples in multiple programming languages.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://docs.scrapecreators.com${path}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${endpointData.name} API Endpoint - Scrape Creators Documentation`} />
        <meta name="twitter:description" content={`${endpointData.description} - Complete API documentation with examples.`} />
      </Helmet>
      <EndpointHeader 
        title={endpointData.name}
        description={endpointData.description}
      />

      <div className="mt-6 flex w-full flex-col space-y-4">
        <EndpointMethod 
          method={endpointData.method}
          path={endpointData.path}
          onTryClick={() => console.log('Try endpoint')}
        />
        
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 xl:hidden">
            <CodeBlock language="JavaScript" endpoint={endpointData} />
            <CodeBlock language="200" endpoint={endpointData} />
          </div>
        </div>
      </div>

      <div className="relative mt-8 prose prose-gray dark:prose-invert">
        <ParameterSection
          title="Headers"
          parameters={[
            {
              name: "x-api-key",
              type: "string",
              required: true,
              description: 'Your Scrape Creators API key'
            }
          ]}
        />

        {endpointData.params.length > 0 && (
          <ParameterSection
            title="Query Parameters"
            parameters={endpointData.params}
          />
        )}
        
        {endpointData.responseFields?.length > 0 && (
          <ResponseFields fields={endpointData.responseFields} />
        )}
      </div>
    </>
  );
}