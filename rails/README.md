# fbrbuilds (backend)

## Setup Notes
1. On initial setup, comment out line 12 (`# Rake::Task["db:add_foreign_data_wrapper_interface"].invoke`) from `rails/db/seed.rb`. The order in which the foreign data wrappers are invoked can sometimes cause setup issues.

2. Set two environment variables: `FOREIGN_DATABASE_USERNAME` and `FOREIGN_DATABASE_PASSWORD` (check Dashlane) to comport with the username and password of your postgres foreign database. You may need to set your Postgres development environment database variables in .env:

`POSTGRES_USER`: should be set to the development database postgres username
`POSTGRES_DEV_HOST`: should be set to the host of the development database
`POSTGRES_PASSWORD`: should be set to the password of the development database username

3. Run `bin/setup`

4. Parcels dump are not restored in the db seeding tasks. Restore it using pg_restore command pg_restore -a -h 'localhost' -U 'ya' -d 'fbrbuilds_development' -vxOW -j 8 -t parcels ./lib/import/parcels.dump; if postgis was installed in heroku_ext folder, run the following instead: PGOPTIONS="-c search_path=public,heroku_ext" pg_restore command pg_restore -a -h 'localhost' -U 'ya' -d 'fbrbuilds_development' -vxOW -j 8 -t parcels ./lib/import/parcels.dump

5. Run the following:
```
rake import:user_data
rake import:development_data

rake database:refresh_calculated_fields
rake database:fix_seq_id
rake database:populate_long_lat


```

### Postgres Security Challenges

In order to implement foreign data wrappers your postgres user defined in `database.yml` needs to have super user privileges or it will fail. You can do this with: `ALTER ROLE fbrbuilds WITH SUPERUSER;`

The foreign database also needs to allow connections via pg_hba.conf in the following manner:

```
ubuntu@ip:/etc/postgresql/9.5/main$ sudo vi pg_hba.conf
ubuntu@i:/etc/postgresql/9.5/main$ sudo pg_ctlcluster 9.5 main restart -m fast
```

### Latitude and Longitude Script
If you run into an error about a development or edit not containing latitude or longitude as a required property, you might need to run `rake database:populate_long_lat` to populate the latitude and longitude fields from the point field.

## Deployment
1. In one terminal window, ssh into either the staging (prep) or production (live) server

2. In another terminal window, run either cap staging deploy or cap production deploy from either the develop or master branch, depending on whether you want to push to live or to staging. *Note: staging deploys from Github's develop branch and production deploys from the master branch. Make sure your work is up-to-date!*
