import { Strategy } from 'passport-github2'
import { BaseProvider } from '@/middleware/passport/BaseProvider'
import { register } from '@/service/UserService'
import { Provider } from '@/common/constants'

type GithubProfile = {
  id: string
  nodeId: string
  displayName: string
  username: string
  profileUrl: string
  emails: [{ value: string }]
  photos: [{ value: string }]
  provider: string
}

export const github = new BaseProvider(
  '/oauth/github',
  '/oauth/github/callback',
  'login-github',
  new Strategy(
    {
      clientID: process.env.oauth.provider.github.clientId,
      clientSecret: process.env.oauth.provider.github.clientSecret,
      callbackURL: process.env.oauth.provider.github.callbackUrl,
    },
    (
      accessToken: string,
      refreshToken: string,
      profile: GithubProfile,
      done
    ) => {
      register({
        id: profile.id,
        name: profile.username!,
        provider: Provider.GITHUB,
      }).subscribe((user) => {
        return done(null, user)
      })
    }
  ),
  Provider.GITHUB
)
