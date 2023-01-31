#!/bin/bash
pandoc --standalone --to=html5 --template=scrollem.html "$@"