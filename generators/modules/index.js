import Generator from "yeoman-generator";

class DrupalModuleGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  initializing() {
    this.argument("drupalTheme", { type: String, required: false });
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "drupalModuleName",
        message: "What is your Module name ? (example: Newsletter Container)",
        default: "Drupal Module Default",
      },
    ]);
  }

  writing() {
    const { drupalModuleName = "default module" } = this.answers;
    const { drupalTheme = "default" } = this.options;

    const MODULE_PATH = "web/modules/custom";
    const TEMPLATE_PATH = "web/themes/custom/" + drupalTheme + "/templates";

    // Drupal Module Name => drupal_module_name
    const drupalModuleFolderName = drupalModuleName
      .split(" ")
      .join("_")
      .toLowerCase();

    // copy info.yml
    this.fs.copyTpl(
      this.templatePath(`module.info.yml`),
      this.destinationPath(
        `${MODULE_PATH}/${drupalModuleFolderName}/${drupalModuleFolderName}.info.yml`
      ),
      {
        module_name: drupalModuleName,
      }
    );

    // copy .module file
    this.fs.copyTpl(
      this.templatePath(`module.module`),
      this.destinationPath(
        `${MODULE_PATH}/${drupalModuleFolderName}/${drupalModuleFolderName}.module`
      ),
      {
        module_name: drupalModuleFolderName,
      }
    );

    // copy php file
    const phpFilename = drupalModuleName.split(" ").join("");

    this.fs.copyTpl(
      this.templatePath(`module.php`),
      this.destinationPath(
        `${MODULE_PATH}/${drupalModuleFolderName}/src/Plugin/Block/${phpFilename}.php`
      ),
      {
        module_name: drupalModuleFolderName,
        module_uppercase_name: drupalModuleName,
        module_class_name: phpFilename,
      }
    );

    // copy template
    const cssClassname = drupalModuleName.split(" ").join("-").toLowerCase();

    this.fs.copyTpl(
      this.templatePath(`module.html.twig`),
      this.destinationPath(
        `${TEMPLATE_PATH}/${drupalModuleFolderName}/${drupalModuleFolderName}.html.twig`
      ),
      {
        module_class_name: cssClassname,
      }
    );

    // copy css
    this.fs.copyTpl(
      this.templatePath(`module.css.txt`),
      this.destinationPath(
        `${TEMPLATE_PATH}/${drupalModuleFolderName}/${drupalModuleFolderName}.css`
      ),
      {
        module_class_name: cssClassname,
      }
    );
  }
}

export default DrupalModuleGenerator;
