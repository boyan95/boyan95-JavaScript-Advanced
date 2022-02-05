import { html, until } from "../lib.js";
import { getAll, getMyItems } from "../api/data.js";
import { getUserData } from "../util.js";

const catalogTemplate = (dataPromise, userPage) => html`
<div class="row space-top">
        <div class="col-md-12">
          <h1>${userPage ? "My Furniture" : "Welcome to Furniture System"}</h1>
          <p>${userPage ? "This is a list of your publications." : "Select furniture from the catalog to view details"}.</p>
        </div>
      </div>
      ${until(dataPromise, html`<p>Loading... &hellip;</p>`)}
      </div>`;

const itemTemplate = (item) => html`<div class="row space-top">
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src=${item.img} />
        <p>${item.description}</p>
        <footer>
          <p>Price: <span>${item.price} $</span></p>
        </footer>
        <div>
          <a href=${`/details/${item._id}`} class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>
</div>`;

export function catalogPage(ctx) {
  const userPage = ctx.pathname == "/my-furniture";
  ctx.render(catalogTemplate(loadItems(userPage), userPage));
}

async function loadItems(userPage) {
  let items = [];
  if (userPage) {
    const userId = getUserData().id;
    items = await getMyItems(userId);
  } else {
    items = await getAll();
  }

  return items.map(itemTemplate);
}
