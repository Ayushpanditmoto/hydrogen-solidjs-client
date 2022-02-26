import { AiFillDelete } from "solid-icons/ai";
import { createResource, For, Match, Show, Switch } from "solid-js";
import GroupCard from "../../components/groups/GroupCard";
import GroupCardSkeleton from "../../components/groups/GroupCardSkeleton";
import { fetchMyCreatedGroups } from "../../services/group.service";
import Empty from "../../components/shared/Empty";
import Error from "../../components/shared/Error";
export default function MyGroups() {
  const [resource] = createResource(fetchMyCreatedGroups);
  return (
    <div>
      <h4 className="text-2xl font-bold">Groups You`ve Created</h4>
      <div className="my-8">
        <Switch>
          <Match when={resource.loading}>
            <GroupCardSkeleton />
          </Match>
          <Match when={resource.error}>
            <Error
              error="server"
              name={resource.error.name}
              message={resource.error.message}
            />
          </Match>
          <Match when={resource()}>
            <Show
              when={resource().data.data.groups.length}
              fallback={
                <Empty
                  title="No Groups Created"
                  subTitle="You`ve not created any groups Yet. Create your first group"
                />
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3">
                <For each={resource().data.data.groups}>
                  {(group) => (
                    <GroupCard {...group}>
                      <button className="text-red-500 dark:text-white font-semibold py-2 w-full flex items-center  bg-red-100 dark:bg-red-400 justify-center space-x-2 hover:bg-red-200 dark:hover:bg-red-500 rounded text-sm">
                        <AiFillDelete size={18} />
                        <span>Delete group</span>
                      </button>
                    </GroupCard>
                  )}
                </For>
              </div>
            </Show>
          </Match>
        </Switch>
      </div>
    </div>
  );
}