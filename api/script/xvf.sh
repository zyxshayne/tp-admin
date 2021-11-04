#!/bin/bash
xvf(){
     if [ ! -f $1 ];then
          echo "Go package dose not exists!"
          exit 0;
     fi
     tar  -xvf $1'/'$2
     if [ $? -ne 0 ];then
          echo "Failed to xvf  package!"
          exit 0;
     fi
     cd  $2
     mv  index.html  $1'../../applicaltion/index/view/'$2'.html'
     mkdir -p $1'../static/index/'$2
     if [ ! -d images ];then
          echo "images dose not exists!"
          exit 0;
      fi
     if [ ! -d tiles ];then
        echo "tiles dose not exists!"
        exit 0;
     fi
     if [ ! -f preview.jpg ];then
        echo "tiles dose not exists!"
        exit 0;
     fi
     if [ ! -f pano2vr_player.js ];then
        echo "tiles dose not exists!"
        exit 0;
     fi
     mv  images tiles preview.jpg pano2vr_player.js $1'../static/index/'$2
}
xvf

