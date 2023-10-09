#!/bin/bash

vite build

# download tesseract.js-core/ to node_modules/
curl -o core.tgz https://api.gopubby.com/file/712323326575378562/tesseract.js-core-5.0.0.tar.gz
tar -xvf core.tgz
mv tesseract.js-core-5.0.0 node_modules/tesseract.js-core
