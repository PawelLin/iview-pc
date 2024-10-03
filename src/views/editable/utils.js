export class EditableSingleLimit {
    constructor (options = {}) {
        this.EDITABLE_KEY = options.key || 'EDITABLE_KEY'
        this.DURATION = options.duration || 30
        this.value = options.value || `${Date.now()}`
        this.init()
    }
    init () {
        this.editable = !this.getCookie().includes(this.value)
        if (this.editable) {
            this.setCookie()
            this.startInterval()
            this.listen()
        }
    }
    getEditable () {
        return this.editable
    }
    listen () {
        window.addEventListener('unload', () => {
            this.stopInterval()
            this.clearCookie()
        })
        window.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                const data = localStorage.getItem(this.EDITABLE_KEY)
                if (data) {
                    this.stopInterval()
                    this.setCookie(data)
                    this.startInterval()
                    localStorage.removeItem(this.EDITABLE_KEY)
                }
            }
        })
    }
    startInterval () {
        this.interval = setInterval(() => {
            this.setCookie()
        }, this.DURATION * 1000)
    }
    stopInterval () {
        clearInterval(this.interval)
    }
    getExpires (duration = this.DURATION) {
        const date = new Date()
        date.setSeconds(date.getSeconds() + duration)
        return `expires=${date.toUTCString()}`
    }
    getCookie () {
        let cookieValue = ''
        for (const cookie of document.cookie.split(';')) {
            const [ key, value ] = cookie.trim().split('=')
            if (key === this.EDITABLE_KEY) {
                cookieValue = value
                break
            }
        }
        return cookieValue ? cookieValue.split(',') : []
    }
    setCookie (cookie) {
        cookie = cookie || this.getCookie().concat(this.value).join(',')
        document.cookie = `${this.EDITABLE_KEY}=${cookie};${this.getExpires()}`
    }
    clearCookie () {
        const cookie = this.getCookie().filter(value => value !== this.value).join(',')
        document.cookie = `${this.EDITABLE_KEY}=${cookie};${this.getExpires()}`
        localStorage.setItem(this.EDITABLE_KEY, cookie)
    }
}
