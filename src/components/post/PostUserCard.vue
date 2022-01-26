<template>
  <div class="card mt-5">
    <div class="card-body">
      <h5 class="card-title">Email:{{user.email}}</h5>
      <h6 class="card-title">Username:{{user.username}}</h6>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">
        <div class="card-body">
          <h6 class="card-title">Address</h6>
          <ul>
            <li>Street:{{user.address.street}}</li>
            <li>Suite:{{user.address.suite}}</li>
            <li>City:{{user.address.city}}</li>
            <li>Zipcode:{{user.address.zipcode}}</li>
            <li>Geo: lat {{user.address.lat}} lng {{user.address.lng}}</li>
          </ul>
        </div>
      </li>
      <li class="list-group-item">Phone:{{user.phone}}</li>
      <li class="list-group-item">
        <div class="card-body">
          <h6 class="card-title">Company</h6>
          <ul>
            <li>Name:{{user.company.name}}</li>
            <li>Catch phrase:{{user.company.catchPhrase}}</li>
            <li>BS:{{user.company.bs}}</li>
          </ul>
        </div>
      </li>
    </ul>
    <div class="card-body">
      <a :href="'https://' + user.website" class="card-link">{{user.website}}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>
