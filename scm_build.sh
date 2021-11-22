#!/bin/bash

set -e
set -x

#-- 准备环境
. /home/tiger/.nvm/nvm.sh
nvm install v14.17.3

#-- 定义变量
DIR=`pwd`
TMP="$DIR/dist"
OUTPUT="$DIR/output"
RESOURCE="$DIR/output_resource"

#--- 准备目录
mkdir $OUTPUT
mkdir $RESOURCE

#--- 前端构建
npm install --production
npm run build

#--- 移动文件
cp -R $TMP/* $OUTPUT
cp -R $TMP/* $RESOURCE
