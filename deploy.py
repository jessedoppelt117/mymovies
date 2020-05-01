#!/usr/bin/env python

from os import listdir, path, remove, chdir, system
from shutil import rmtree, copytree, copyfile

for f in listdir(path.expanduser("~/moviesdeploy/server")):
    if f != ".git":
        full_path = path.expanduser("~/moviesdeploy/server/" + f)
        if path.isdir(full_path):
            rmtree(full_path)
        else:
            remove(full_path)

print("Deleted old files from deploy folder")

chdir(path.expanduser("~/movies/client"))
system("npm run build >/dev/null 2>&1")

print("Built the frontend")

build_dest = path.expanduser("~/movies/server/build")
if path.isdir(build_dest):
    rmtree(build_dest)
copytree(path.expanduser("~/movies/client/build"), build_dest)

print("Copied frontend build to server directory")

for f in listdir(path.expanduser("~/movies/server")):
    if f != ".git":
        src_path = path.expanduser("~/movies/server/" + f)
        dest_path = path.expanduser("~/moviesdeploy/server/" + f)
        if path.isdir(src_path):
            copytree(src_path, dest_path)
        else:
            copyfile(src_path, dest_path)

print("Copied new files to deploy folder")

chdir(path.expanduser("~/moviesdeploy/server"))
system("git add -A")
system('git commit -m "Release"')
system("git push")