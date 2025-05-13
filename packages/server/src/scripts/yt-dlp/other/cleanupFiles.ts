import fs from "fs"

export function cleanupFiles(files: string[]): void {
    for (const file of files) {
      if (fs.existsSync(file)) {
        try {
          fs.unlinkSync(file);
        } catch (error) {
          console.error(`Failed to delete file ${file}:`, error);
        }
      }
    }
  }