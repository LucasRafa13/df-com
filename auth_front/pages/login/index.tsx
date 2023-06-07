import { Button } from '@/component/atom/button'
import { Input } from '@/component/atom/input'
import { Card } from '@/component/organism/card'
import { Section } from '@/component/organism/section'
import api from '@/service/api'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const router = useRouter()

  async function login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { access_token, refresh_token } = response.data

      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)

      setIsLogged(true)

      api.interceptors.response.use(
        response => response,
        async error => {
          const originalRequest = error.config
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const refreshResponse = await api.post('/refresh', {
              refresh_token: localStorage.getItem('refresh_token'),
            })
            localStorage.setItem(
              'access_token',
              refreshResponse.data.access_token
            )
            api.defaults.headers.common['Authorization'] =
              'Bearer ' + refreshResponse.data.access_token
            return api(originalRequest)
          }
          return Promise.reject(error)
        }
      )
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    login(email, password)
  }

  useEffect(() => {
    console.log(isLogged, localStorage.getItem('access_token'))

    if (isLogged || localStorage.getItem('access_token')) {
      router.push('/cover')
    }
  }, [isLogged])

  return (
    <Section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <Card>
              <div>
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Por favor, informe seus dados de acesso.
                </p>

                <Input
                  type="email"
                  id="typeEmailX"
                  label="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  id="typePasswordX"
                  label="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <Button onClick={handleSubmit}>Login</Button>
              </div>

              <div>
                <p className="mt-5">
                  Não tem uma conta?{' '}
                  <Link href="/register" className="text-white-50 fw-bold">
                    Cadastre-se agora
                  </Link>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  )
}
