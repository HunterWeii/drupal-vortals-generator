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
        name: "drupalComponentName",
        message: "What is your Component name ? (example: Article Card)",
        default: "Drupal Component Default",
      },
    ]);
  }

  writing() {
    const { drupalComponentName = "default component" } = this.answers;
    const { drupalTheme = "default" } = this.options;

    const TEMPLATE_PATH = "web/themes/custom/" + drupalTheme + "/components";

    // Drupal Component Name => drupal-component-name
    const drupalComponentFolderName = drupalComponentName
      .split(" ")
      .join("-")
      .toLowerCase();

    // copy info.yml
    this.fs.copyTpl(
      this.templatePath(`component.component.yml`),
      this.destinationPath(
        `${TEMPLATE_PATH}/${drupalComponentFolderName}/${drupalComponentFolderName}.component.yml`
      ),
      {
        component_name: drupalComponentName,
      }
    );

    // copy twig
    this.fs.copyTpl(
      this.templatePath(`component.twig`),
      this.destinationPath(
        `${TEMPLATE_PATH}/${drupalComponentFolderName}/${drupalComponentFolderName}.twig`
      ),
      {
        component_class_name: drupalComponentFolderName,
      }
    );

    // copy css
    this.fs.copyTpl(
      this.templatePath(`component.css.txt`),
      this.destinationPath(
        `${TEMPLATE_PATH}/${drupalComponentFolderName}/${drupalComponentFolderName}.css`
      ),
      {
        component_class_name: drupalComponentFolderName,
      }
    );
  }
}

export default DrupalModuleGenerator;
