FILE_PATH=$(readlink -f "$0")
PARENT_DIR_PATH=$(dirname "$FILE_PATH")

source ${PARENT_DIR_PATH}/../.venv/bin/activate
python ${PARENT_DIR_PATH}/api.py