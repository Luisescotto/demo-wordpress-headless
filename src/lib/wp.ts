import _slug_ from "../pages/post/[slug].astro";

const domain= import.meta.env.WP_DOMAIN
const apiURL = `${domain}/wp-json/wp/v2`


export const getPageInfo = async (slug:string) => {
    const response = await fetch(`${apiURL}/pages?slug=${slug}`)

    if(!response.ok){
        throw new Error("Failded to fetch page info");
    }

    const [data] = await response.json()
    const {title: {rendered: title}, content: {rendered: content}} = data;
    return {title, content}
}

export const getLatestPost = async({perPage = 10}: {perPage?: number} = {}) =>{
    const response = await fetch (`${apiURL}/posts?per_page=${perPage}&_embed`)

    if(!response.ok){
        throw new Error("Failded to fetch Latest Posts");
    }

    const results = await response.json();
    if(!results.length){
        throw new Error("No posts found")
    }

    const posts = results.map(post =>{
        // const {
        // title: {rendered: title}, 
        // excerpt: {rendered: excerpt},
        // content: {rendered: content},
        // date,
        // slug
    
        // } = post;

        const title= post.title.rendered;
        const excerpt = post.excerpt.rendered;
        const content = post.content.rendered;
        const {date, slug} = post;
        const featuredImage = post._embedded['wp:featuredmedia'][0].source_url;
        return {title, excerpt, content, date, slug, featuredImage}
    })

    return posts;


}

export const getPostInfo = async(slug: string) =>{
    const response = await fetch(`${apiURL}/posts?slug=${slug}`);
    if (!response.ok){
        throw new Error("Failed to fetch all posts");
    }
   

    const [data] = await response.json()
    const {title: {rendered: title}, content: {rendered: content}} = data;
    return {title, content}
}


export const getAllPostsSlugs = async()=>{
    const response = await fetch(`${apiURL}/posts?per_page=100`)
    if(!response){
        throw new Error("Failed to fetch all posts")
    }

    const results = await response.json();
    if(!results.length){
        throw new Error("No posts found");
    }

    const slugs = results.map((post) => post.slug);
    return slugs;
}



export const getLatestProducts = async({perPage = 10}: {perPage?: number} = {}) =>{
    const response = await fetch (`https://motorslanding.webhostingfree.io/wp-json/wp/v2/products?per_page=${perPage}&_embed`)

    if(!response.ok){
        throw new Error("Failded to fetch Latest Posts");
    }

    const results = await response.json();
    if(!results.length){
        throw new Error("No posts found")
    }

    const posts = results.map(post =>{
        // const {
        // title: {rendered: title}, 
        // excerpt: {rendered: excerpt},
        // content: {rendered: content},
        // date,
        // slug
    
        // } = post;

        const title= post.acf.titulo;
        const {date, slug} = post;
        const modelo = post.acf.modelo;
        const marca = post.acf.marca;
        const precio = post.acf.precio;
        const imagen = post.acf.imagen;
        return {title, date, slug,modelo, marca, precio, imagen}
    })

    return posts;


}