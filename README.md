log4j catalog Electron edition
------------------------------

## Development

```bash
npm install
```

* copy application.properties to application.properties.dev

```bash
cp application.properties application.properties.dev
```

* set values to application properties

```bash
catalogPath=audit-service-api/src/main/resources/catalog.json
repository=logging-log4j-audit-sample
username=<username>
accessToken=<accessToken>
```

```bash
npm run electron-dev
```

Happy hacking!!!