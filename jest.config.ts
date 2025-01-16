/** @type {import('ts-jest').JestConfigWithTsJest} */

import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });


module.exports = {
    preset: 'ts-jest',
    testEnvironment: './jsdom-extended.ts',
    moduleNameMapper: {
      "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
      "\\.(css|less)$": "<rootDir>/mocks/fileMock.js"
    }
    
    
    // moduleNameMapper: {
    //   '^app/(.*)$': '<rootDir>/app/$1',
    // },
  };



  