node {
  env.NODEJS_HOME = "${tool 'Node-8.2.1'}"
  // on linux / mac
  env.PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
  // on windows
  env.PATH = "${env.NODEJS_HOME};${env.PATH}"

  //set CI environment to true. Required for running create-react-app tests in no-watch mode
  env.CI = true;

  stage('Checkout') {
    checkout scm
  }

  stage('NPM Package Install') {
    sh 'npm install'
  }

  stage('Test'){
    env.NODE_ENV = 'test'
    print 'Environment will be : ${env.NODE_ENV}'
    env.CI = true
    print 'Running in CI mode : ${env.CI}'

    sh 'npm test'
  }
}