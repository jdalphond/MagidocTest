import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
import fs from  'fs'
import { dir } from 'console';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


async function getAllFiles(folderPath) {
  console.log("In get All Files : " , folderPath)
  const files = [];
  const directoryEntries = await fs.promises.readdir(folderPath, { withFileTypes: true });
  console.log(directoryEntries)
  for (const entry of directoryEntries) {
    const fullPath = path.join(folderPath, entry.name);
    if (entry.isFile()) {
      files.push(fullPath); // Add full path to the array
    } else if (entry.isDirectory()) {
      const subfolderFiles = await getAllFiles(fullPath); // Recursive call
      files.push(...subfolderFiles); // Spread operator for efficient concatenation
    }
  }

  return files;
}

async function formatFiles(folderpath) {
  console.log("THIS SHOULD GET PRNITED", folderpath)
  const pages = []
  try {
    const allFiles = await getAllFiles(folderpath);
 
    for(let idx=0; idx<allFiles.length; idx++){
      const content = await fs.promises.readFile(allFiles[idx])
      console.log(content.toString())
      pages.push({title: 'Page ' + idx, content: content.toString()})
    }
  } catch (error) {
    console.error('Error reading files:', error);
  }
  console.log("PAGES")
  console.log(pages)
  return pages;
}
(async () => {

})();

export default {
    introspection: {
      type: 'url',
      url: 'http://localhost:4000',
    },
    website: {
      template: 'carbon-multi-page',
      staticAssets: path.join(__dirname, 'assets'),
      siteRoot: 'http://localhost:8082/introduction/welcome',
      options: {
        pages: await formatFiles(path.join(__dirname, 'extra_pages'))
      }
    },
  }