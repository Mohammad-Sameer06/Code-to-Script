require('dotenv').config();
const { generateVideoScript } = require('./services/aiService');

async function test() {
  try {
    const rawCode = `function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}`;
    console.log('Testing with raw code:\n', rawCode);
    const result = await generateVideoScript(rawCode, 'javascript');
    console.log('Success! Result:\n', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Test failed:', error);
  }
}

test();
