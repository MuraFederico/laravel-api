<template>
    <div class="container">
        <!-- <post-filter :categories="categories" :users="users" /> -->
        <form @submit.prevent="getFilteredData()" class="row g-3 mb-3">
            <div class="col-md-6">
                <select class="form-select" aria-label="Default select example" name="category" id="category" v-model="filterCategory">
                    <option value="" selected>Select a category</option>


                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>

                </select>
            </div>

            <div class="col-md-6">
                <select class="form-select" aria-label="Default select example" name="author" id="author" v-model="filterUser">
                    <option value="" selected>Select an author</option>


                    <option v-for="user in users" :key="user.id" :value="user.id" >{{ user.name }}</option>

                </select>
            </div>

            <div class="col-md-10">
                <label for="search-string" class="form-label">stringa di ricerca</label>
                <input type="text" class="form-control" id="search-string" name="s" v-model="filterString">
            </div>

            <div class="col-md-2">
                <button class="btn btn-primary">Applica filtri</button>
            </div>
        </form>



        <div class="row justify-content-center g-4">
            <div class="col-md-4" v-for="post in posts" :key="post.id">
                <div class="card h-100">
                    <img :src="post.media" class="card-img-top" alt="...">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ post.title }}</h5>
                        <p class="card-text">{{ post.content }}</p>
                        <a :href="'/posts/' + post.slug" class="btn btn-primary mt-auto align-self-start">Read more</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="text-center">
                Page {{ nCurrentPage }} of {{ nLastPage }}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{disabled: nCurrentPage == 1}" @click="getData(firstPageUrl)">
                        <a class="page-link">First</a>
                    </li>
                    <li class="page-item" :class="{disabled: !prevPageUrl}" @click="getData(prevPageUrl)">
                        <a class="page-link">Previous</a>
                    </li>

                    <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li> -->

                    <li class="page-item">
                        <form @submit.prevent="getData(baseApiUrl + '/?page=' + nNewPage)">
                            <input type="text" name="" id="" v-model="nNewPage">
                        </form>
                    </li>

                    <li class="page-item" :class="{disabled: !nextPageUrl}" @click="getData(nextPageUrl)">
                        <a class="page-link">Next</a>
                    </li>
                    <li class="page-item" :class="{disabled: nCurrentPage == nLastPage}" @click="getData(lastPageUrl)">
                        <a class="page-link">Last</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import PostFilter from './PostFilter.vue'

    export default {
        name: 'CardContainer',
        components: {
            PostFilter,
        },
        data() {
            return {
                filterCategory: '',
                filterUser: '',
                filterString: '',

                posts: [],
                categories: [],
                users: [],

                baseApiUrl: 'http://localhost:8000/api/posts',

                nNewPage: null,
                prevPageUrl: null,

                nextPageUrl: null,
                firstPageUrl: null,

                lastPageUrl: null,

                nCurrentPage: null,
                nLastPage: null,
            }
        },
        methods: {
            getData(url) {
                if (url) {
                    Axios.get(url)
                    .then(res => {
                        this.posts =  res.data.data.data;
                        this.prevPageUrl = res.data.data.prev_page_url;
                        this.nextPageUrl = res.data.data.next_page_url;
                        this.firstPageUrl = res.data.data.first_page_url;
                        this.lastPageUrl = res.data.data.last_page_url;
                        this.nCurrentPage = res.data.data.current_page;
                        this.nLastPage = res.data.data.last_page;
                        this.nNewPage = null;
                        this.categories = res.data.categories;
                        this.users = res.data.users;
                        // console.log(res.data.request);
                    });
                }
            },
            getFilteredData() {
                Axios.get(`http://127.0.0.1:8000/api/posts?category=${this.filterCategory}&author=${this.filterUser}&s=${this.filterString}`)
                    .then(res => {
                        this.posts =  res.data.data.data;
                    });
            }
        },
        created() {
            this.getData(this.baseApiUrl);
        }
    }
</script>

<style >
    .page-link {
        cursor: pointer;
    }
</style>
