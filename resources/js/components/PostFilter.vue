<template>
    <div>
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
    </div>
</template>

<script>
export default {
    name: 'PostFilter',
    props: {
        categories: Array,
        users: Array,
    },
    data() {
        return {
            filterCategory: '',
            filterUser: '',
            filterString: '',
        }
    }
}
</script>

<style>

</style>
