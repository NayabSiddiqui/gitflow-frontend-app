def handleCheckout = {
	sh "echo 'Checking out a merge request...'"
	def credentialsId = scm.userRemoteConfigs[0].credentialsId
	checkout ([
		$class: 'GitSCM',
		branches: [[name: "${env.gitlabSourceNamespace}/${env.gitlabSourceBranch}"]],
		extensions: [
			[$class: 'PruneStaleBranch'],
			[$class: 'CleanCheckout'],
			[
				$class: 'PreBuildMerge',
				options: [
					fastForwardMode: 'NO_FF',
					mergeRemote: env.gitlabTargetNamespace,
					mergeTarget: env.CHANGE_TARGET
				]
			]
		],
		userRemoteConfigs: [
			[
				credentialsId: credentialsId,
				name: env.gitlabTargetNamespace,
				url: env.gitlabTargetRepoSshURL
			],
			[
				credentialsId: credentialsId,
				name: env.gitlabSourceNamespace,
				url: env.gitlabSourceRepoSshURL
			]
		]
	])
}

node {
  env.NODEJS_HOME = "${tool 'Node-8.2.1'}"
  // on linux / mac
  env.PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"
  // on windows
  env.PATH = "${env.NODEJS_HOME};${env.PATH}"

  //set CI environment to true. Required for running create-react-app tests in no-watch mode
  env.CI = true;



  stage('Codebase Setup') {
    sh 'printenv'

    checkout scm
  }

  stage('NPM Package Install') {
    print "Globally install the create-react-app package"
    sh 'npm install create-react-app'

    print "Installing packages for the project"
    sh 'npm install'
  }

  stage('Build typescript and css'){
    sh 'npm run build'
  }

  stage('Test'){
    env.NODE_ENV = 'test'
    print "Environment will be : ${env.NODE_ENV}"
    env.CI = true
    print "Running in CI mode : ${env.CI}"

    sh 'npm run test:ci'
  }
}