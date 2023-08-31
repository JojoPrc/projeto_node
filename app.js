import chalk from 'chalk';
import  program  from 'commander';
import readline from 'readline';

class PropertyManager {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.properties = [];
  }

  start() {
    program
      .version('1.0.0')
      .description('Gerenciador de propriedades CSS')
      .option('-a, --add <property>', 'Adicione uma propriedade CSS')
      .parse(process.argv);

    if (program.add) {
      this.addProperty(program.add);
    } else {
      this.collectProperties();
    }
  }

  collectProperties() {
    this.rl.question(chalk.blue('Digite uma propriedade CSS ou "SAIR" para encerrar: '), (input) => {
      if (input.toUpperCase() === 'SAIR') {
        this.finish();
      } else {
        this.addProperty(input.trim());
        this.collectProperties();
      }
    });
  }

  addProperty(property) {
    this.properties.push(property);
    console.log(chalk.blue(`Propriedade '${property}' adicionada.`));
  }

  finish() {
    this.properties.sort();
    console.log(chalk.green('Propriedades CSS ordenadas:'));
    this.properties.forEach(prop => {
      console.log(chalk.greenBright(prop));
    });
    console.log(chalk.red('Ok, terminou.'));
    this.rl.close();
  }
}

  
const propertyManager = new PropertyManager();
propertyManager.start();
