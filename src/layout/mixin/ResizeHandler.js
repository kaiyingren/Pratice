import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
    watch: {
        $route (route) {
            if (this.device === 'mobile' && this.sidebar.opened) {
                store.dispatch('app/closeSideBar', { withoutAnimation: false })
            }
        }
    },
    beforeMount () {
        window.addEventListener('resize', this.resizeHandler)
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.resizeHandler)
    },
    mounted () {
        const isMobile = this.isMobile()
        if (isMobile) {
            store.dispatch('app/toggleDevice', 'mobile')
            store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
    },
    methods: {
        // 如果宽度小于992 则按照移动端处理
        isMobile: () => {
            const rect = body.getBoundingClientRect()
            return rect.width - 1 < WIDTH
        },
        resizeHandler: () => {
            // 如果页面处于显示状态
            if (!document.hidden) {
                // console.log(this.a.methods.isMobile())
                const isMobile = this.a.methods.isMobile()
                // 下面的写法会报错？？？为什么访问不到上面的isMobile()方法呢
                // const isMobile = this.isMobile()
                store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
                if (isMobile) {
                    store.dispatch('app/closeSideBar', { withoutAnimation: true })
                }
            }
        }
    }
}
