## Convirtiendo mongod Standalone a Replica Set

```bash
# run mongo container
$ docker compose up -d

# use mongosh to reconnect to the server instance
$ mongosh

# initialize the replica set
$ rs.initiate()
```
