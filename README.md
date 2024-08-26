# apimetrics

A lightweight utility package for analyzing api metrics like total calls,
response time ,min response time,max response time etc.

## Description

`analytics-apimetrics` is a simple yet powerful utility package designed to make your life easier by providing a complete analysis
tool for api performance check

at first you have to register to a web platform where you can visualize the api performance
the link is :- https://apimetrics-frontend-5662l6b7t-rakesh-ghoshs-projects.vercel.app/
here after register or login you can track your api performance

## Installation

You can install the package via npm:

````bash
npm install analytics-apimetrics

```yarn
yarn add analytics-apimetrics

## Usage

Here's a basic example of how to use the package:

for commonjs module

const ApiMetricsClass = require('analytics-apimetrics');

app.use(ApiMetricsClass.storeMetrics({ uniqueCode: uniqueCode }));

for ESmodule

import ApiMetricsClass from 'analytics-apimetrics';
app.use(ApiMetricsClass.storeMetrics({ uniqueCode: uniqueCode }));


here you have to pass the uniqueCode which you will get after register
there will be an alert box whcih has 24 length string you have to pass


````
