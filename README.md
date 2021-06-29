# Alpha server

API:

Path: /api/alpha

`GET`: Optional param: name, id. If not specified return all

```json
{
  "data": {
    "symbolList": ["BTC", "ABC", "EOS", "LTC"],
    "window": 30,
    "nodes": ["s1", "m0", "s3"],
    "setupOPs": [ ["m5", 58, [1.0, 30, 13]],
      ["m6", 58, [1.0, 13, 13]],
      ["v4", 60, [-1, 1, 13]]
    ],
    "predictOPs": [ ["v7", 25, ["v4", "v4"]],
      ["m8", 42, ["m5", "m7"]],
      ["s5", 55, ["m8"]]],
    "updateOPs": [ ["s1", 67, ["s20"]],
      ["s20", 3, ["s0", "s5"]],
      ["v17", 23, ["v4", "v4"]]],
    "operandsValues": {
      "s1": [1, 2, 3, 4]
    },
    "name": "abc",
    "_id": "60db3d22c1224571857c79da"
  },
  "status": true
}
```

`POST`: Request body format
```typescript
{
    symbolList: string[];
    window: number;
    nodes: string[];
    setupOPs: any[];
    predictOPs: any[];
    updateOPs: any[];
    operandsValues: any;
    name?: string;
}
```

`DELETE`: id or name is required
