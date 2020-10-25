local file = fs.open("out.txt", "w")
file.write("It works!")
file.close()

cctools.finish();
