cp index.html ~/codechangers/codechangers.com/projects/camp/index.html;
cp platformer.js ~/codechangers/codechangers.com/files/camp/assets/platformer.js;
cd ~/codechangers/codechangers.com/;
jekyll build && s3_website push;
cd -;
