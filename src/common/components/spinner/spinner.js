import React from 'react';
import { Spin } from 'antd';
import { usePromiseTracker } from 'react-promise-tracker'

export default function Spinner ({ children }) {
        const { promiseInProgress } = usePromiseTracker();
       return (
        <Spin style={{position:'fixed', left:'7%',top:'10%'}} spinning={promiseInProgress} size="large">
            {children}
        </Spin>
      );  
}