import { CourseOverview } from "@/models"

export const courseDescriptionParser = (coursePageOverview: string = ""): CourseOverview => {
    let courseOverview: CourseOverview = {
        about: '',
        prerequisites: '',
        courseStaff: '',
        faq: []
    };

    const overviewFragment = new DOMParser().parseFromString(coursePageOverview, 'text/html')
    const about = overviewFragment.getElementsByClassName('about')[0].getElementsByTagName('p')
    const prerequisites = overviewFragment.getElementsByClassName('prerequisites')[0].getElementsByTagName('p')
    const questions = overviewFragment.getElementsByClassName('response')
    // const courseStaff = overviewFragment.getElementsByClassName('course-staff')[0].getElementsByTagName('p')

    console.log(questions)

    let i = 0;
    while (true) {
        if (i < about.length) {
            courseOverview.about += about[i].innerHTML
            courseOverview.about += "\r\n"
        }

        if (i < prerequisites.length) {
            courseOverview.prerequisites += prerequisites[i].innerHTML
            courseOverview.prerequisites += "\r\n"
        }

        if (i < questions.length) {
            courseOverview.faq.push({
                question: questions[i].getElementsByTagName('h3')[0].innerText,
                // questions[i].getElementsByTagName('p')
                 response: (function(): string{
                    const responses =  questions[i].getElementsByTagName('p')
                    let response = ""
                    for(let item of responses) {
                        response += item.innerText
                        response += "\r\n"
                    }
                    return response
                 })()
            })
            // courseOverview.faq.push(questions[i].getElementsByTagName('h3')[0].innerText)
        }

        i++
        if (i > about.length || i > prerequisites.length || i > questions.length){
            break;
        }
    }

    return courseOverview
}