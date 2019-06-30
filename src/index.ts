'use strict'

import * as fs from 'fs-extra';

/**
 * Takes the contents of the Gridsome build and copies them to a destination.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 0.1.0
 */
module.exports = class GridsomePluginCopyBuild {

  /**
   * The directory to copy the build files to.
   * 
   * @since 0.1.0
   * 
   * @property {string}
   */
  targetDir: string;

  /**
   * A reference to the dist folder of the application using this plugin.
   * 
   * @since 0.1.0
   * 
   * @property {string}
   */
  dist: string = `${process.cwd()}/dist`;

  /**
   * @param {Object} options
   * @param {string} options.targetDir The directory to copy the build files to.
   */
  constructor(api: any, options: any) {

    this.targetDir = options.targetDir;

    /**
     * Wait until the Gridsome build is finished to copy the files.
     */
    api.afterBuild(() => this.boot());

  }

  /**
   * Copies the files from the dist folder to the target directory.
   * 
   * @since 0.1.0
   * 
   * @private
   */
  private boot() {

    fs.copy(this.dist, this.targetDir)
      .then(() => {

        console.log(`Copied contents of ${this.dist} to ${this.targetDir}`);

      })
      .catch((err) => {

        throw new Error(err);

      });

  }

}
