import { Coffee } from "lucide-react";
import { categoryIcons, categoryIconKey } from "../lib/categoryIcons";
export function CategoryIcon({ category, ...props }) { const Icon = categoryIcons.find(i => i.key === categoryIconKey(category))?.Icon || Coffee; return <Icon {...props} />; }
