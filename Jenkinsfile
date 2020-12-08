node {
  parameters {
    string(name: 'profiles', defaultValue: 'dev', description: '빌드 환경')
  }

  stage('build') {
    echo '${params.profiles build!!!}'
    sh "sudo npm i"
    sh "sudo npm run:${params.profiles}"
  }
}
