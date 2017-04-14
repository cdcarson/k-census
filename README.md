# k-census

## Installation

```sh
git clone git@github.com:cdcarson/k-census.git
cd k-census
npm install
```

## Usage

```sh
node analyze-states
```

## Output

```js
{ total: 322446343,
  average: 6448926.86,
  atollVariance: 51821053444420.64,
  atollVarianceMin: 7.025630077706069e-17,
  atollVarianceMax: 2037844224635845.8,
  twoPassVariance: 51821053444420.64,
  twoPassVarianceMin: 7.025630077706069e-17,
  twoPassVarianceMax: 2037844224635845.8,
  chrisNaiveBucketVariances:
   { '1':
      { bucketWidth: 1,
        variance: 51821053444420.64,
        varianceMin: 0,
        varianceMax: 2037844224635845.8 },
     '1000':
      { bucketWidth: 1000,
        variance: 51821616.52840001,
        varianceMin: 0,
        varianceMax: 2037839889.1535974 },
     '1000000':
      { bucketWidth: 1000000,
        variance: 52.66240000000003,
        varianceMin: 0,
        varianceMax: 2032.2063999999975 },
     '10000000':
      { bucketWidth: 10000000,
        variance: 0.6883999999999998,
        varianceMin: 0,
        varianceMax: 20.070399999999953 },
     '20000000':
      { bucketWidth: 20000000,
        variance: 0.17439999999999997,
        varianceMin: 0,
        varianceMax: 5.017599999999988 } } }
```
