export function createPages(pages, pagesTotal, page) {
    if(pagesTotal > 10) {
        if(page > 5) {
            for (let i = page-4; i <= page+5; i++) {
                pages.push(i)
                if(i === pagesTotal) break
            }
        }
        else {
            for (let i = 1; i <= 10; i++) {
                pages.push(i)
                if(i === pagesTotal) break
            }
        }
    }  else {
        for (let i = 1; i <= pagesTotal; i++) {
            pages.push(i)
        }
    }
}