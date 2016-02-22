# elasticsearch-snaps
A simple Elasticsearch plugin for restoring and deleting snapshots.

## Installation
Install elasticsearch-snaps:

`bin/plugin install johnwilliams/elasticsearch-snaps`

## Usage
Browse to [http://localhost:9200/_plugin/snaps/](http://localhost:9200/_plugin/snaps/)

Snaps will automaticly find all of your snapshot repositories and list all of the backups. 
Restoring is as simple as clicking the restore link for the snapshot you would like to restore. 
You can also delete snapshots by clicking the delete link.

![Snaps Snapshot](http://i.imgur.com/cENHIjU.png)

