import React from 'react';
import Layout from './components/Layout';

const withLayout = (wrappedComponent) =>{
    return (props)  => (
        <Layout>
          <wrappedComponent {...props} />
        </Layout>
      );
};
export default withLayout;