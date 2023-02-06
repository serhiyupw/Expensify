const testFileExtension = '[jt]s?(x)';
module.exports = {
    rootDir: '..',
    preset: 'react-native',
    testMatch: [
        `<rootDir>/tests/ui/**/*.${testFileExtension}`,
        `<rootDir>/tests/unit/**/*.${testFileExtension}`,
        `<rootDir>/tests/actions/**/*.${testFileExtension}`,
        `<rootDir>/?(*.)+(spec|test).${testFileExtension}`,
    ],
    transform: {
        '^.+\\.jsx?$/': 'babel-jest',
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!react-native)/',
    ],
    testPathIgnorePatterns: [
        '<rootDir>/node_modules',
    ],
    globals: {
        __DEV__: true,
        WebSocket: {},
    },
    timers: 'fake',
    testEnvironment: 'jsdom',
    setupFiles: [
        '<rootDir>/jest/setup.js',
    ],
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
    ],
    cacheDirectory: '<rootDir>/.jest-cache',
};
