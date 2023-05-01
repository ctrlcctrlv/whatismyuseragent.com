let fs = import("fs");
let path = import("path");

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function get_file_contents(event, file) {
  // To debug your problem
  console.log(path.resolve(file));

  // Solution is to use absolute path using `__dirname`
  fs.readFile(process.env.LAMBDA_TASK_ROOT + file, function (err, data) {
    if (err) throw err;
  });
}