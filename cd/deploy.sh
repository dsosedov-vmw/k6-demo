#!/usr/bin/env sh
./gradlew bootJar
cf push -f cd/manifest.yml
